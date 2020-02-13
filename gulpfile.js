const fs = require("fs");
const { src, dest, series, parallel } = require("gulp");
const replace = require("gulp-replace");


const contentDir = "portfolio/";
const eportfolioDir = "eportfolio/";
const websiteDir = "docs/";

const html = {
    template: contentDir + "index.html",

    welkomEP: contentDir + "welkomEP.html",
    welkomWEB: contentDir + "welkomWEB.html",

    overmij: contentDir + "overmij.html",
};

function genEPortfolio() {
    return src([html.welkomEP, html.overmij]).pipe(dest(eportfolioDir));
}

function genSPA() {
    var webpages = [html.welkomWEB, html.overmij];
    var content = "<h1>Portfolio R0751964</h1>";
    for (var i = 0; i < webpages.length; i++) {
        content += fs.readFileSync(webpages[i], "utf-8");
    }
    content += "<br><br>";

    return src(html.template)
        .pipe(replace("<!-- Content -->", content))
        .pipe(replace("<h1>", "<h2>"))
        .pipe(dest(websiteDir));
}

exports.default = parallel(genEPortfolio, genSPA);