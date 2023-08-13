# HOMA CASE STUDY

## Introduction

This repository is a case study coded for Homa Games.

It uses Cypress with Typescript to automate some non regression tests.

As there are not much tests, they have been coded in one single Cypress file : ```cypress\e2e\case-study.cy.ts```.

## Install

Clone the repository and launch ```npm install```.

No ```.env``` file needed.

## Run Cypress

### With UI

```npm run cypress:open```

Then click on ```E2E Testing``` and choose any browser.

In the new window, click on ```case-study.cy.ts``` to launch the tests.

### Headless

Cypress offers the opportunity to launch the tests via the terminal, without launching the UI.

```npm run cypress:run```

You can add ```--browser chrome/firefox/electron``` (choose one) to specify a browser.

## Visual Reports

When running Cypress via ```npm run cypress:run```, a report is created by Mochawesome as follow :

```cypress\reports\html\index.html``` : open in a browser to see a better looking reports than the standard stout.

```cypress\reports\html\videos``` : a video file of the tests performed.