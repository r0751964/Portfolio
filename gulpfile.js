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
    projecten: contentDir + "projecten.html",
};

function genEPortfolio() {
    return src([html.welkomEP, html.overmij, html.projecten]).pipe(replace(/(<h1>.*<\/h1>)?/, "", )).pipe(dest(eportfolioDir));
}

function genSPA() {
    var webpages = [html.welkomWEB, html.overmij, html.projecten];
    var content = "";
    for (var i = 0; i < webpages.length; i++) {
        content += fs.readFileSync(webpages[i], "utf-8");
    }
    content += "<br><br>";

    return src(html.template)
        .pipe(replace("<!-- Content -->", content))
        .pipe(replace("<h2>", "<h3>")).pipe(replace("</h2>", "</h3>"))
        .pipe(replace("<h1>", "<h2>")).pipe(replace("</h1>", "</h2>"))
        .pipe(dest(websiteDir));
}

function copyResources() {
    return src(contentDir + "resources/*").pipe(dest(websiteDir + "resources/"))
}

exports.default = parallel(genEPortfolio, genSPA, copyResources);