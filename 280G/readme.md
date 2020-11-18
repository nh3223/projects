# 280G

## Background

The project is derived from my work as a tax attorney at Perkins Coie.  Section 280G of the Code is the "golden parachute" provision of the Internal Revenue Code.  While it can always apply to public companies, in my practice it was generally applied in the merger and acquisitions context related to the sale of private companies.  In this context, the rules of Section 280G (which include a 20% excise tax on certain payments) can be avoided if the shareholders of the company being sold approve all of the applicable payments.  In connection with preparing the approval documents, an analysis of all of the payments needs to be conducted to determine the extent to payments would be affected by the 280G rules.  I had developed an Excel Spreadsheet for completing this analysis, but it often became bloated and unresponsive as many formulas are repeated throughout the spreadsheet.  This project is designed to streamline the process from beginning to end with a more friendly user interface than Excel sheets and a snappier overall application.

## Structure and Challenges

In general, this is a very straightforward application with web forms for data input and a basic display of the results.  There will be a number of specific features that will be challenging (at least to me at my current level of proficiency).  These include:

    Scraping of data from IRS revenue rulings for applicable interest rates and option valuation

    Developing a two-tier system of user authorization (one for user access generally, one to apply specifically to particular transactions, to limit the scope of potential leakage of sensitive transaction and compensation information)

    Utilization of pop-up boxes to explain and enhance data entry
    
    Formatting the output results to be printer-friendly

# Technology Stack

The back end will be written in Python using Flask with a SQLite database.  The front end will use basic HTML, CSS and vanilla Javascript.  Javascript will only be used for interface enhancements, such as explanatory pop-ups.

# Process

1. Develop Models
2. Develop and Test Back End Formulas for Analysis
3. Develop and Test Web Scraping to automate data entry of interest rates and for option valuation
4. Develop Front End Forms for Data Entry
5. Develop Printer-Friendly Results
6. Enhance data entry with Pop-Ups
7. Layer in authentication and security components

