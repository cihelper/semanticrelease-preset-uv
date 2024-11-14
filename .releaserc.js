export default {
  // https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration
  branches: [
    { name: "main" },
    { name: "next" },
    { name: "+([0-9])?(.{+([0-9]),x}).x" },
    { name: "dev", prerelease: true },
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "# Changelog",
      },
    ],
    [
      "@cihelper/semanticrelease-plugin-uv",
      {
        uvPublish: process.env.SEMREL_UV_PUBLISH !== "false",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "dist/*.tar.gz", label: "sdist" },
          { path: "dist/*.whl", label: "wheel" },
        ],
        failComment: false,
        successComment: false,
        addReleases: "bottom",
      },
    ],
    [
      "semantic-release-major-tag",
      {
        customTags: ["v${major}", "v${major}.${minor}"],
      },
    ],
    [
      "@semantic-release/git",
      {
        message: "chore(release): ${nextRelease.version}",
        assets: ["pyproject.toml", "uv.lock", "*/__init__.py", "CHANGELOG.md"],
      },
    ],
  ],
};
