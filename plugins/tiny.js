// 𝐁𝐘 𝐂𝐑𝐀𝐙𝐘 𝐃𝐄𝐕 𝐆𝐈𝐕𝐄 𝐂𝐑𝐄𝐃𝐈𝐓:
//𝐖𝐀.𝐌𝐄/24165730123

const { cmd } = require("../command");
const fetch = require("node-fetch"); // Assurez-vous que node-fetch est installé

// Définition de la fonction fetchJson
const fetchJson = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in fetchJson:", err);
    throw err;
  }
};

cmd({
  pattern: 'tinyurl',
  alias: ['tiny', 'shorten', 'short', 'shorturl'],
  react: '🪤',
  desc: 'Shorten a URL using TinyURL or ShortURL.',
  category: 'main',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) return reply('Please provide a URL to shorten.');

    await reply('> *crazy in Processing...*');

    // Construire l'URL de l'API selon la commande utilisée
    let apiUrl = '';
    if (command === 'tiny' || command === 'tinyurl') {
      apiUrl = `https://api.davidcyriltech.my.id/tinyurl?url=${encodeURIComponent(q)}`;
    } else {
      apiUrl = `https://api.davidcyriltech.my.id/tinyurl?url=${encodeURIComponent(q)}`;
    }

    await reply('> *Shortening URL...*');

    // Appel à l'API pour raccourcir l'URL
    const response = await fetchJson(apiUrl);
    const result = response.result;

    // Construire la légende avec l'URL raccourcie
    const caption = ` \`CRAZY URL SHORTENER\` \n\n\n*Original Link:* ${q}\n\n*Shortened Link:* ${result}\n\n> 𝖯𝖮𝖶𝖤𝖱𝖤𝖣 𝖡𝖸 CRAZY MD`;

    // Envoyer le message avec une image
    await conn.sendMessage(from, { 
      image: { url: `https://i.imgur.com/XUf6AAS.jpeg` }, // Image URL
      caption: caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363411838@newsletter',
          newsletterName: '𝐂𝐑𝐀𝐙𝐘 𝐌𝐃',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error("Error in shortining URL:", e);
    reply(`❌ An error occurred: ${e.message}`);
  }
});