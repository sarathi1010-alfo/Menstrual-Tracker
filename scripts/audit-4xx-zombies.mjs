import http from 'http';

const urls = [
    "http://localhost:3000/blog/menstrual-cycle-101-beginners-guide",
    "http://localhost:3000/what-is-menstrual-cycle",
    "http://localhost:3000/use-cases/cycle-tracking-teens-guide",
    "http://localhost:3000/conditions/pcos-and-cycle-tracking-guide",
    "http://localhost:3000/sitemap.xml",
];

let allPassed = true;

const checkUrl = (url) => {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.error(`URL failed: ${url} (Status: ${res.statusCode})`);
                allPassed = false;
            } else {
                console.log(`URL OK: ${url}`);
            }
            resolve();
        }).on('error', (e) => {
            console.error(`URL error: ${url} (${e.message})`);
            allPassed = false;
            resolve();
        });
    });
};

const runAudit = async () => {
    console.log("Starting 4xx Zombie Audit...");
    for (const url of urls) {
        await checkUrl(url);
    }
    if (!allPassed) {
        console.error("Audit failed. Some URLs are not accessible.");
        process.exit(1);
    } else {
        console.log("Audit passed. All URLs returned 200 OK.");
    }
};

runAudit();
