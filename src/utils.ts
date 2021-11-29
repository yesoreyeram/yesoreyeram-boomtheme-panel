import { BoomTheme } from 'BoomTheme';

export const getThemeCSSFile = function (mode: 'dark' | 'light'): string {
  let fileName = '';
  if (['dark', 'light'].indexOf(mode.toLowerCase()) > -1 && window.performance) {
    let appFiles = window.performance
      .getEntries()
      .map((e) => e.name)
      .filter((e) => e.endsWith('.js'))
      .filter((e) => e.indexOf('/public/build/app.') > -1);
    if (appFiles && appFiles.length > 0) {
      fileName =
        appFiles[0].replace(`/public/build/app.`, `/public/build/grafana.${mode.toLowerCase()}.`).slice(0, -3) + '.css';
    }
  }
  return fileName;
};
export const getActiveThemeName = function (themes: BoomTheme[], index: number): string {
  switch (index) {
    case -1000:
      return 'Grafana Default';
    case -2000:
      return 'Grafana Dark';
    case -3000:
      return 'Grafana Light';
    default:
      return themes[index] && themes[index].name ? themes[index].name : 'Grafana Default';
  }
};
