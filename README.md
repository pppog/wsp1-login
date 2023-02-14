# Login

Setup är gjort ```express --no-view --git -css sass``` så forka för din grupp.
Kör sedan ```npm install``` för att installera alla paket.

```bash
cd wsp1-login
npm install
```

## Kravspec

En använda ska kunna logga in med en användare på sidan.
En användare ska kunna logga ut från sin användare.
En användare ska kunna registrera ett nytt konto med användarnamn och lösenord.

* Nytt git repo för gruppen med dokumentation
* Databas, tabell för användare
* Routes enligt REST praxis
* Paket, node, express med nunjucks, sass
* Kodstil, detta ska bestämma, dokumentera och använda .prettierrc. Ni kan behöva installera prettier för vscode för att faktiskt använda det.

## Databas

Databas ska planeras och skapas.
Ni behöver skapa den på skolservern. Använd lämpligt prefix för att visa att er databas tillhör eran grupp.

## Routes

Något liknande detta kan vara en start.

* index
* get register
* post register
* get login
* post login

**requires auth**
* post logout
* get profile

## Paket

Vilka paket kommer ni att behöva för att kunna köra projektet. Saknas något utöver det som finns?s

# Arbetsgång

Arbetet är uppdelat i följande huvudmoment, de består i sin tur av ett antal delmoment.

1. Setup
2. Planering
3. Utveckling
4. Koda
5. Extra

Ni kommer att få instruktioner tilldela till er grupp. Varje del kommer att stämmas av med tillhörande tester. När detta är klart så är ni redo att gå vidare till nästa steg. 

## Tester

I det här projektet finns ett antal tester, det är en hjälp för er att komma vidare och för att visa vad ni ska arbeta med. De är även en avstämning för när ni ska gå vidare.

För att köra testerna används https://www.npmjs.com/package/jest
Testerna körs med script som finns i ```package.json```.

För att köra alla tester en gång, använd:
```bash	
npm run test
```

Mer användbar är att starta tester med watch (så de körs automatiskt när ni ändrar i projektet):
```bash
npm run test:watch
```

När jest körs i watch läget så kan ni styra hur det ska köra testerna.
Ni kan till exempel välja att filtrera vilka tester som ska köras. För att göra det så väljer ni ```p``` och skriver testets namn. För det här projektet finns följande tester:
* 1-server
* 2-login
* 3-auth
* 4-register

Ni kan även köra dem med de script som finns i package.json.
```bash	
npm run test:1
npm run test:2
npm run test:3
npm run test:4
```

## Instruktioner

Finns i mappen [instruktioner](/instruktioner/).
Vi kommer att arbeta i grupperna och följa instruktionerna.
Ni kommer att få en tidsram och fördelning om hur ni ska gå tillväga.

Tänk på att alla i gruppen ska vara delaktiga så att ni tillsammans hjälps åt med detta. Ni har gruppledare som har ett ansvar, men det betyder inte att ni andra kan slappna av.