export const getThemeCSSFile = function (mode: string): string {
    let fileName = '';
    if (["dark", "light"].indexOf(mode.toLowerCase()) > -1 && window.performance) {
        let appFiles = window.performance.getEntries().map(e => e.name).filter(e => e.endsWith(".js")).filter(e => e.indexOf("/public/build/app.") > -1);
        if (appFiles && appFiles.length > 0) {
            fileName = appFiles[0].replace(`/public/build/app.`, `/public/build/grafana.${mode.toLowerCase()}.`).slice(0, -3) + ".css";
        }
    }
    return fileName;
};
