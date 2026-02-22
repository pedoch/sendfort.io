const pool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function generatePermalink(): string {
  var result = "";

  for (var i = 10; i > 0; --i)
    result += pool[Math.floor(Math.random() * pool.length)];

  return result;
}
