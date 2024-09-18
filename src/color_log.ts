export function log_green(tag: string, message: string) {
  console.log(`\x1b[32;1m[${tag}]\x1b[0;32m ${message}`);
}
export function log_red(tag: string, message: string) {
  console.log(`\x1b[31;1m[${tag}]\x1b[0;31m ${message}`);
}
export function log_yellow(tag: string, message: string) {
  console.log(`\x1b[33;1m[${tag}]\x1b[0;33m ${message}`);
}
export function log_gray(tag: string, message: string) {
  console.log(`\x1b[30;1m[${tag}]\x1b[0;30m ${message}`);
}
