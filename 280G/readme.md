# M&A 280G Analysis

## Background

The project is derived from my work as a tax attorney at Perkins Coie.  Section 280G of the Code is the "golden parachute" provision of the Internal Revenue Code.  While it can always apply to public companies, in my practice it was generally applied in the merger and acquisitions context related to the sale of private companies.  In this context, the rules of Section 280G (which include a 20% excise tax on certain payments) can be avoided if the shareholders of the company being sold approve all of the applicable payments.  In connection with preparing the approval documents, an analysis of all of the payments needs to be conducted to determine the extent to payments would be affected by the 280G rules.  I had developed an Excel Spreadsheet for completing this analysis, but it often became bloated and unresponsive as many formulas are repeated throughout the spreadsheet.  This project is designed to streamline the process from beginning to end with a more friendly user interface than Excel sheets and a snappier overall application.

## Structure and Future Features

In general, this is a very straightforward application with web forms for data input and a basic display of the results.  Features to be included in further iterations of this application include:

    Scraping of data from IRS revenue rulings for applicable interest rates and option valuation (some of this was completed using python in the python_version)

    Developing a two-tier system of user authorization (one for user access generally, one to apply specifically to particular transactions, to limit the scope of potential leakage of sensitive transaction and compensation information)

    Utilization of pop-up boxes to explain and enhance data entry
    
    Formatting the output results to be printer-friendly

    Automatic preparation of approval documenation

# Technology Stack

Originally, I intended to develop this application with a back end written in Python using Flask with a SQLite database and front end with basic HTML, CSS and vanilla Javascript.  Javascript will only be used for interface enhancements, such as explanatory pop-ups.  Progress on this original version was never completed, but remains in the python_version folder.

After further research and self-teaching, I completely changed the technology stack to a ReactJS front end with a Node.js back end and a MongoDB database.  In addition, this application uses Recoil for state management and Styled Components for applying CSS and basic html tags to the application.  I also added significant testing of the front end components, React hooks and utilities with Jest and React Testing Libary.