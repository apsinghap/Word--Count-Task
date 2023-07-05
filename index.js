const express = require('express');
const app = express();
const axios = require('axios');

const cheerio = require('cheerio');
const _ = require('lodash');


async function getTotalWordCount(url) {
    try {
        // Send a GET request to the specified URL
        const response = await axios.get(url);

        // Load the HTML content using Cheerio
        const $ = cheerio.load(response.data);

        // Extract the text content from HTML elements
        const text = $('body').text();

        // Remove non-alphanumeric characters and convert to lowercase
        const cleanedText = text.replace(/[^A-Za-z0-9 ]+/g, '').toLowerCase();

        // Split the cleaned text into individual words
        const words = cleanedText.split(/\s+/);

        // Count the total number of words
        const totalWordCount = words.length;
        // Extract URLs from anchor tags
    const urls = [];
    $('a').each((index, element) => {
      const url = $(element).attr('href');
      if (url) {
        urls.push(url);
      }
    });

        return  totalWordCount ;
    } catch (error) {
        console.error('Error: Could not retrieve the website content.', error.message);
        return null;
    }
}

// Example usage
// const websiteUrl = 'https://www.sarkariresult.com/';
// getTotalWordCount(websiteUrl)
//     .then(count => {
//         if (count) {
//             console.log(`Total number of words on the website: ${count}`);
//         }
//     })
//.catch(error => {
// console.error('An error occurred:', error.message);
// })

exports.wordCount = (req, res, next) => {
    try {
        
        console.log(req.body.websiteUrl)
        getTotalWordCount(req.body.websiteUrl)
            .then(count => {
                if (count) {
                    console.log(`Total number of words on the website: ${count}`);
                    
                    res.status(201).json({ message: "sucess", count: count })
                }
            })

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'failed' })
    }
}