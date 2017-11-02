//TODO: install node.js
//TODO: get code from git or tfs first
//TODO: modify the environment variable paths to point to the actual locations
//TODO: run webdriver-manager

[Environment]::SetEnvironmentVariable("APP_CONFIG_PATH","C:\\automation\\protractor_jasmine_typescript\\custom","Machine")
[Environment]::SetEnvironmentVariable("SELENIUM_SERVER_PATH","%appdata%/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.6.0.jar","Machine")
[Environment]::SetEnvironmentVariable("CHROME_DRIVER_PATH","%appdata%/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver","Machine")

npm install
