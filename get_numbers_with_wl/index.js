import { accounts } from './accounts.js';
import fetch from 'node-fetch';

const raffleId = "97cf8c4fb4bc10";
const discordAccounts = accounts.map(({ discord }) => discord.slice(0, -5));

const discordWinnersResponse = await fetch("https://www.subber.xyz/api/fetchGiveawayEntries", {
  method: 'POST',
  body: JSON.stringify(
    { accessToken: ".eyJ1c2VySWQiOigtOTZjMCBSQdLuTXHQJV1hbRxjQ9ZMfF18_g_reZNsXA", 
      raffleId })
});

if (!discordWinnersResponse.ok) {
  throw new Error(`Failed to fetch Discord winners: ${discordWinnersResponse.status} ${discordWinnersResponse.statusText}`);
}

const discordWinners = await discordWinnersResponse.json();
const winnerNames = discordWinners.entries
  .filter(({ winner_number }) => winner_number !== null)
  .map(({ discord_name: name = '' }) => name);


let outputAccounts = [];
winnerNames.forEach((name) => {
    const account = accounts.find(({ discord }) => discord.slice(0, -5) === name);
    if (account) {
      outputAccounts.push(account.number);
    }
});
console.log(outputAccounts.join(","));
console.log("Total amount:", outputAccounts.length)