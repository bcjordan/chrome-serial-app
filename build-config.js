/**
 * @file Configuration for Chrome app signing and test-page uploading to S3.
 *   File paths can either be absolute or include a ~ to denote env['HOME']
 *
 *   Warning: do not check these files in, browserify them, etc.
 *   It happens: https://www.reddit.com/r/netsec/comments/u26pv/yahoo_included_their_cert_private_key_inside_the/
 */
module.exports = {
  /**
   * Should include properties:
   * {
   *   "AWSAccessKeyId": "MYACCESSKEYID",
   *   "AWSSecretKey": "my+secret+key"
   * }
   */
  "s3_keys_file": "~/.secrets/aws-keys.json",
  /**
   * Generate following instructions from:
   * https://developer.chrome.com/extensions/packaging#creating
   */
  "chrome_signing_pem": "~/.secrets/chrome-app-test.pem",
  /**
   * Find the following in chrome://extensions with Developer mode checked
   */
  "chrome_deploy_extension_id": "hclkodmlbbhiknnciphlcnbkglgjakmd",
  "chrome_dev_extension_id": "himpmjbkjeenflliphlaaeggkkanoglo"
};
