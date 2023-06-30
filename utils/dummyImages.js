//微信官方文档实例项目里的超大号Dummy Data图片包，随便造
const srcList = [
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYcv7mQABQVg50gh51-Kb1mlBq0c8Difu3rXn0ldrZdZwVx9REPbKVyZb3E9Wq6YFLA',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYVtRBEXZ74JLECYN4Hc3Cdml3x7cJcbcBj3sIdYb2L_7DJ14X8TAHiZ7Ydct52WIYA',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYfaqohk6ndcC6_CBkUZszfSpKbqUAV7S2xWRbAQ459YsPWAmLKkicEOPS1L3NmnnRA',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYa7k4CAG71Ci0SRPExPB1sGiiVPcYwSD5CAYgq8Ni2RhGQlqIrIwnBlt90mUzL7Lg',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYjda9Dp372N3T05q_nn3PgvoXBoReXvaXBfkthtXQLN7m5_YI6FoTre-xvJBDFLMA',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYTIqRBCdQgzZm3KO3usZT7zM2O0EoylisontlH4TZAC_qfVjFVU4L4CPjLm0mppQwg',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYfa6mRnywhNbBFV5eAt7oTz3zjlNJeujfQx0PVA1ufenPHBvxYXRNJ5chyi6RPaE7A',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYY1OalScOn4EMcQpkPaJ1Sxhri8CScjnhqVfjAZnLuVFl0JAM4VziHhSzHLZXtAaQ',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYSPfXw5qxNvP3f5uJhy0kdkaTAbIZ187IFWmBiluEs8Puw0tXgBlBgGKN-irLPOIDw',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYZB1p48LLH-Pc7Rzr4nN0YF-uZg7FW7zksw_Kjp0BNDHcZp9R9SRKbg0rA1HBaeK3Q',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYXMoGlbo8DkSiia6d-_3Dv15DjMGCEhBkPYd5BrNkSUTPtomAm0CVeHgC244sapKw',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYf3q0W302-kseD8VxLKoItZ6HgneLkgpQSEMIgEKz_xVE7putZxs2YEYqB13Uh37_w',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYc-vygvNNpz1fcZZjZ6B0Jm0X2dpOWJBn4u4T15gwL-1Qr70v6fkFgUswldiPhQG0Q',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYUo-SgGpk2gpFNixuaCMxDadRvvWxqC5jc1ma-oobJf4mWVg3F3iRt1Bkv-sR0l3-Q',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJCk-lm-hNrvdJ9paSPqTXkCKLE6eIuc6zAs3Lr1Qh6jEMxdfgP_rvTftB0SQiZeQNQ',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJImpE8Sm-oMoeJizjFr8mxotXQSFlSm8ZUD6GLf_ptM5ozLvnc2eczwSN09Y5M0ovg',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJBAK7KJg9KId_6N1-rJ4OyCCQoJGVMOaTabboo2viRucoxkPvHRkn2fVl6tectlzBg',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJGVi_kGQppwXClflw43wtANVzuw0_Y8ij9VzW1O8hr6cR195D87X7zQS_1gjRo8IdQ',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJHhlMVj_svRRdDMHjtAvwGwU2d_VAJ-y3SigDx2XjjA22Y63oStS-fw5gooV5rX42Q',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJPRaN5CDI6NZFg_qbSxeqF8UBpM4lXJ_1o9S9bsOOxMpuXGLeKyAKleWlAXmVLmQOw',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJMQYuLq5q6_CWdtW3RnWbYMaNhzew60nGsQfBtyeogj3vRfGimJBi87ThS577HC6ag',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJBalQKoYXBze_mRhoUHIh5OfHiR95JEa18ob-y7uu8W1gpOjO87BbOcki3xM_RrO1Q',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJAqHss14EPHStg3OpHjtIYzOGQgxvsDcACMxQc2waTpAMsJBFxVlp1JkZQJy2gXu3g',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJH2f0R4uXyqnNGlrivO8cKbn0nz1DE_6s22rc91zluwIrqiAVZNREvCeVYAUS8aaZw',
]

const widthList = [
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYfaqohk6ndcC6_CBkUZszfSpKbqUAV7S2xWRbAQ459YsPWAmLKkicEOPS1L3NmnnRA',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYa7k4CAG71Ci0SRPExPB1sGiiVPcYwSD5CAYgq8Ni2RhGQlqIrIwnBlt90mUzL7Lg',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYjda9Dp372N3T05q_nn3PgvoXBoReXvaXBfkthtXQLN7m5_YI6FoTre-xvJBDFLMA',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYTIqRBCdQgzZm3KO3usZT7zM2O0EoylisontlH4TZAC_qfVjFVU4L4CPjLm0mppQwg',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYfa6mRnywhNbBFV5eAt7oTz3zjlNJeujfQx0PVA1ufenPHBvxYXRNJ5chyi6RPaE7A',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYY1OalScOn4EMcQpkPaJ1Sxhri8CScjnhqVfjAZnLuVFl0JAM4VziHhSzHLZXtAaQ',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYSPfXw5qxNvP3f5uJhy0kdkaTAbIZ187IFWmBiluEs8Puw0tXgBlBgGKN-irLPOIDw',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYZB1p48LLH-Pc7Rzr4nN0YF-uZg7FW7zksw_Kjp0BNDHcZp9R9SRKbg0rA1HBaeK3Q',
]

const heightList = [
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJBAK7KJg9KId_6N1-rJ4OyCCQoJGVMOaTabboo2viRucoxkPvHRkn2fVl6tectlzBg',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJGVi_kGQppwXClflw43wtANVzuw0_Y8ij9VzW1O8hr6cR195D87X7zQS_1gjRo8IdQ',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJHhlMVj_svRRdDMHjtAvwGwU2d_VAJ-y3SigDx2XjjA22Y63oStS-fw5gooV5rX42Q',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJPRaN5CDI6NZFg_qbSxeqF8UBpM4lXJ_1o9S9bsOOxMpuXGLeKyAKleWlAXmVLmQOw',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYVtRBEXZ74JLECYN4Hc3Cdml3x7cJcbcBj3sIdYb2L_7DJ14X8TAHiZ7Ydct52WIYA',
]

const landscapeList = [
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYfaqohk6ndcC6_CBkUZszfSpKbqUAV7S2xWRbAQ459YsPWAmLKkicEOPS1L3NmnnRA',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYjda9Dp372N3T05q_nn3PgvoXBoReXvaXBfkthtXQLN7m5_YI6FoTre-xvJBDFLMA',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYfa6mRnywhNbBFV5eAt7oTz3zjlNJeujfQx0PVA1ufenPHBvxYXRNJ5chyi6RPaE7A',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYY1OalScOn4EMcQpkPaJ1Sxhri8CScjnhqVfjAZnLuVFl0JAM4VziHhSzHLZXtAaQ',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYZB1p48LLH-Pc7Rzr4nN0YF-uZg7FW7zksw_Kjp0BNDHcZp9R9SRKbg0rA1HBaeK3Q',
  'https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJPRaN5CDI6NZFg_qbSxeqF8UBpM4lXJ_1o9S9bsOOxMpuXGLeKyAKleWlAXmVLmQOw',
  'https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w'
]

export function getImages() {
  return srcList
}

export function getWidthImages() {
  return widthList
}

export function getHeightImages() {
  return heightList
}

export function getLandscapeImages() {
  return landscapeList
}
