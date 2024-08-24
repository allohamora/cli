const red = (log) => `\x1b[31m${log}\x1b[0m`;

module.exports = {
  deep: true,
  upgrade: true,

  /**
   * @description https://github.com/raineorshine/npm-check-updates?tab=readme-ov-file#filterresults
   * @param {string} packageName
   * @param {{ currentVersion: string, upgradedVersion: string }} versions
   * @returns {boolean}
   */
  filterResults: (packageName, { currentVersion, upgradedVersion }) => {
    if (currentVersion.startsWith('^')) {
      return true;
    }

    console.warn(red(`${packageName}@${currentVersion} wasn't upgraded to ${upgradedVersion} because it is static`));

    return false;
  },
};
