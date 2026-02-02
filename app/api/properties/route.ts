import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// Configuration Vercel
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET() {
  console.log("🟢 Démarrage Scanner...");
  
  let browser;
  
  try {
    // --- DÉTECTION INTELLIGENTE DE L'ENVIRONNEMENT ---
    if (process.env.NODE_ENV === 'production') {
      // MODE VERCEL (EN LIGNE)
      console.log("🚀 Mode Production (Vercel)");
      const chromium = require('@sparticuz/chromium');
      const puppeteer = require('puppeteer-core');

      // On force le chemin des polices pour éviter les bugs graphiques sur Vercel
      await chromium.font('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf');

      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });

    } else {
      // MODE LOCAL (VOTRE ORDI)
      console.log("💻 Mode Local");
      const puppeteer = require('puppeteer'); // On l'importe ici seulement si besoin
      
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }

    const page = await browser.newPage();

    // Configuration Furtive
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    console.log("⏳ Navigation vers Patrim.fr...");
    await page.goto('https://www.patrim.fr/resultats?transac=vente', {
      waitUntil: 'domcontentloaded',
      timeout: 50000
    });

    // Attente chargement JS
    await new Promise(r => setTimeout(r, 4000));

    const html = await page.content();
    console.log("✅ Page récupérée.");
    
    await browser.close();
    browser = null;

    // --- ANALYSE CHEERIO ---
    const $ = cheerio.load(html);
    const properties: any[] = [];
    const seenUrls = new Set();

    $('a').each((i, element) => {
        const link = $(element).attr('href');
        
        if (link && (link.includes('vente-') || link.includes('achat'))) {
            let fullUrl = link;
            if (!link.startsWith('http')) {
                const path = link.startsWith('/') ? link : `/${link}`;
                fullUrl = `https://www.patrim.fr${path}`;
            }

            if (!seenUrls.has(fullUrl)) {
                const card = $(element).closest('div, article, li');
                const fullText = card.text().replace(/\s+/g, ' ').trim();
                const priceMatch = fullText.match(/(\d[\d\s]*)\s*€/);

                if (priceMatch) {
                    seenUrls.add(fullUrl);
                    const price = parseInt(priceMatch[1].replace(/\s/g, ''));

                    if (price > 50000) {
                        // Titre
                        let title = card.find('h2, h3, h4, .titre').text().trim();
                        if (!title) title = $(element).text().trim();
                        if (title.length < 10) title = "Bien Immobilier à Toulouse";

                        // Surface
                        const surfaceMatch = fullText.match(/(\d+(?:[.,]\d+)?)\s*(?:m²|m2)/i);
                        const surface = surfaceMatch ? Math.round(parseFloat(surfaceMatch[1].replace(',', '.'))) : 0;

                        // Pièces
                        const roomsMatch = fullText.match(/(\d+)\s*pièce/i) || link.match(/-(\d+)pieces-/);
                        const rooms = roomsMatch ? parseInt(roomsMatch[1]) : 0;

                        // Ville
                        let location = "Toulouse";
                        if (fullText.toLowerCase().includes("baziège")) location = "Baziège";
                        else if (fullText.toLowerCase().includes("launaguet")) location = "Launaguet";

                        // Image Détective
                        let image = "";
                        const photoboxImg = card.find('img[src*="photobox"], img[src*="/photo/"]').attr('src');
                        const simpleImg = card.find('img').attr('src');
                        const bgDiv = card.find('[style*="background-image"]').first();
                        let bgImage = "";
                        if (bgDiv.length > 0) {
                            const style = bgDiv.attr('style') || "";
                            const match = style.match(/url\(['"]?(.*?)['"]?\)/);
                            if (match) bgImage = match[1];
                        }

                        if (photoboxImg) image = photoboxImg;
                        else if (simpleImg && !simpleImg.includes('logo')) image = simpleImg;
                        else if (bgImage) image = bgImage;

                        if (image && !image.startsWith('http')) {
                             const imgPath = image.startsWith('/') ? image : `/${image}`;
                             image = `https://www.patrim.fr${imgPath}`;
                        }

                        properties.push({
                            id: fullUrl,
                            title: title,
                            price: price,
                            surface: surface,
                            rooms: rooms,
                            location: location,
                            url: fullUrl,
                            image: image
                        });
                    }
                }
            }
        }
    });

    properties.sort((a, b) => b.price - a.price);
    return NextResponse.json(properties);

  } catch (error) {
    console.error("🔴 Erreur API:", error);
    if (browser) await browser.close();
    return NextResponse.json([], { status: 500 });
  }
}