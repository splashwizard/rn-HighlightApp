var b64c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"   // base64 dictionary
var b64u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"   // base64url dictionary
var b64pad = '='
function base64_charIndex(c) {
    if (c == "+") return 62
    if (c == "/") return 63
    return b64u.indexOf(c)
}
export default function base64_decode(data) {
    var dst = ""
    var i, a, b, c, d, z

    for (i = 0; i < data.length - 3; i += 4) {
        a = base64_charIndex(data.charAt(i+0))
        b = base64_charIndex(data.charAt(i+1))
        c = base64_charIndex(data.charAt(i+2))
        d = base64_charIndex(data.charAt(i+3))

        dst += String.fromCharCode((a << 2) | (b >>> 4))
        if (data.charAt(i+2) != b64pad)
            dst += String.fromCharCode(((b << 4) & 0xF0) | ((c >>> 2) & 0x0F))
        if (data.charAt(i+3) != b64pad)
            dst += String.fromCharCode(((c << 6) & 0xC0) | d)
    }

    dst = decodeURIComponent(escape(dst))
    return dst
}
