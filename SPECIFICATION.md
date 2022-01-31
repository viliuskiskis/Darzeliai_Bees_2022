# SPECIFICATION

## Vaikų darželių informacinė sistema v2 (2022)

Reikalavimų specifikacija
- 2022.01.26	Atnaujintas prioritetų sąrašas	LS
- 2022.01.25	Pridėtas naujas funkcinis reikalavimas #5	LS
- 2022.01.20	Dokumento sukūrimas	LS

## Įvadas

Šis dokumentas aprašo darželių informacinės sistemos pokyčių poreikį miesto savivaldybei ir reikalavimus. Informacinė sistema leistų operatyviau priimti prašymus lankyti ugdymo įstaigą, atlikti eilės skaičiavimus, pateikti statistinius duomenis.
IS poreikio analizė
Vilniaus miesto seniūnijose yra virš 140 vaikų darželių. Preliminariai ikimokyklinio ugdymo įstaigas lanko apie 30 tūkst. vaikų. Miesto savivaldybė kasmet fiziškai priimdavo prašymus, juos apdorodavo, priskirdavo vaikus darželiams, kas reikalavo daug resursų ir laiko.
2021 m. sukurta informacinė vaikų registracijos į darželius sistema rankinį procesą skaitmenizavo ir automatizavo, eilių formavimas tapo optimalesnis. Tolimesniam sistemos egzistavimui ir naudojimui reikalingos papildomos funkcijos.
Reikalingas sprendimas
Reikalinga atnaujinti sistemą, suteikiant jai papildomas funkcijas, tokias kaip prašymų dėl kompensacijų teikimas, atrankos atnaujinimas, saugumo užtikrinimo atnaujinimo darbai.

## Naudotojai ir rolės

Pagrindiniai sistemos naudotojai išlieka tokie patys.

Administratorius - Miesto savivaldybės specialistas, atsakingas už sistemos saugią konfigūraciją ir palaikymą

Švietimo specialistas -	Informacinės sistemos tvarkytojas, atsakingas už centralizuoto vaikų priėmimo į švietimo įstaigas duomenų tvarkymą, tvarkantis įstaigų ir prašymų duomenis.

Vaiko atstovas - Tėvai arba globėjai, turintys teisę naudotis informacine sistema.

## Funkciniai reikalavimai

1.	Migracija (naujausia Spring Boot versija)
2.	Vaiko duomenų nuskaitymas iš išorinės registrų sistemos
Registruojant naujus vaikus sistemoje, įvedus egzistuojantį vaiko asmens kodą, vaiko duomenys (vardas, pavardė, gimimo data) turi būti grąžinami iš išorinės sistemos.
3.	Sukurti prašymą gauti savivaldybės kompensaciją, lankant privatų darželį.
Savivaldybė suteikia galimybę gauti papildomą kompensaciją, jeigu šeima lanko privatų, o ne valstybinį darželį. Norint gauti kompensaciją, savivaldybei sistemoje reikia pateikti prašymą su vaiko ir lankomo darželio duomenimis. Kompensacija yra suteikiama ne fiziniam asmeniui, o nurodytai ugdymo įstaigai.
4.	Atnaujinti vaikų patekimo į ugdymo įstaigas kriterijus
Prie kriterijų buvo pridėtas naujas reikalavimas (žiūrėti lentelės “Vaikų priėmimo tvarkos prioritetai (eilės sudarymas)” reikalavimą nr.2).
5.	Sugeneruoti dokumentą sutarties pasirašymui
Sistemoje tėvams turi būti sugeneruotas priėmimo į darželį informacinis pranešimas, su kuriuo susipažinus būtų sugeneruojama oficiali sutartis tinkanti pasirašymui (PDF).
6.	Pažymos peržiūra ir atsisiuntimas
Švietimo specialistas turi matyti įkeltas vaikų pažymas ir galėti jas atsisiųsti.
7.	Pateikti sistemoje užregistruotas ugdymo įstaigas žemėlapyje.
Tėvai ir švietimo specialistai gali matyti visas ugdymo įstaigas miesto žemėlapyje, taip galėdami aiškiau identifikuoti norimas lankyti ugdymo įstaigas.
8.	Slaptažodžio kodavimo atnaujinimas
9.	Atnaujinta diegimo, panaudojimo dokumentacija.

## Nefunkciniai reikalavimai

1.	Programai kurti naudojamos naujausios Java, Spring, React.js technologijos, reliacinė duomenų bazė (reikalinga esamo projekto migracija į naujesnes versijas (Spring Boot).
2.	Į bet kurią užklausą sistema turi atsakyti greičiau nei per 2 sekundes (web puslapio užkrovimas).
3.	Sistemos slaptažodžiai negali būti saugomi atviru tekstu. Slaptažodžių kodavimo algoritmas turi būti atnaujintas (pakeistas nauju).
Duomenų bazėje saugomi slaptažodžiai negali būti saugomi atviru tekstu ar šifruoti. Slaptažodžiai turi būti būti paslėpti taikant SHA-2 šeimos ar ne mažesnio atitinkamo saugumo maišos funkciją.
4.	Visi sistemos veiksmai kaupiami įvykių žurnale, turi būti realizuota galimybė peržiūrėti įvykius naudotojo sąsajoje (UI).
Visi veiksmai sistemoje kaupiami įvykių žurnale, kartu su juos atliekančių vartotojų identifikaciniais duomenimis bei kitu, konkrečiam įvykiui reikiamu kontekstu.
Įvykių žurnale registruojama:
●	visos vartotojų matomos ir nematomos klaidos
●	vartotojų prisijungimai
●	nesėkmingi prisijungimo bandymai
●	visos būseną keičiančios operacijos (įskaitant vartotojo duomenis, kurie jas atlieka)
5.	Kartu su sistema pateikiama atnaujinta diegimo, panaudojimo dokumentacija.
Pateikiama išsami pagrindinių sistemos funkcijų dokumentacija.
6.	Sistema turi būti suderinama su Linux operacine sistema.
7.	Programuojamas kodas turi būti padengtas unit testais bent 60 %.
8.	Sistemos pridavimo metu, sistema turi teisingai veikti su Google Chrome, Mozilla FireFox ir Microsoft Edge naršyklių to meto naujausiomis versijomis.
9.	Pagrindinė sistemoje naudojama kalba - lietuvių.
Vaikų priėmimo tvarkos prioritetai (eilės sudarymas):

#	Prioritetas (pagal pirmumą)
1	Vaiko deklaruojama gyvenamoji vieta yra miesto savivaldybė;
2	(Atnaujinta) Vaiko vieno iš tėvų deklaruojamoji gyvenamoji vieta Vilniaus savivaldybėje yra ne mažiau kaip 2 metai.
3	Įvaikinti vaikai;
4	Vaikams iš šeimų, auginančių (globojančių) tris ir daugiau vaikų, kol jie mokosi pagal bendrojo ugdymo programas;
5	Vaikams, kurių brolis ar sesuo lanko tą pačią įstaigą (pirmumo teisė įsigalioja iškart, prioritetas taikomas tik toje pačioje įstaigoje, kurią tuo metu lanko brolis ar sesuo);
6	Vaikams, kurių vienas iš tėvų (globėjų) mokosi bendrojo ugdymo mokykloje;
7	Vaikams, kurių vienas iš tėvų (globėjų) turi ne daugiau kaip 40 procentų darbingumo lygio;
Papildoma informacija eilės sudarymui:
●	Registracijos data ir laikas nėra prioriteto kriterijus.
●	Jei prašyme pirmu numeriu nurodytoje įstaigoje nėra laisvų vietų, vieta skiriama antru numeriu pažymėtoje įstaigoje, jei joje yra laisvų vietų, ir t. t. Jeigu visose prašyme pažymėtose įstaigose nėra laisvų vietų, prašymas lieka laukiančiųjų eilėje.
●	Patikrinus IS duomenis apie pirmenybę skirti vaikui vietą įstaigoje ir nustačius vienodą pirmenybių skaičių, vieta eilėje skiriama vyresnio pagal gimimo datą amžiaus vaikams, o, sutapus vaikų gimimo datai, eilė sudaroma abėcėlės tvarka pagal vaiko pavardę.
●	Nesant pirmenybių, vieta eilėje skiriama vyresnio amžiaus vaikams.
●	Į laisvas vietas jau sudarytose grupėse po pagrindinės metų atrankos priimama nuolat. 
Archyvas

## Funkciniai reikalavimai (2021 m.)
1.	Prisijungti prie sistemos tėvams: Naudojant administratoriaus sukurtus prisijungimo duomenis. Administratorius turi galėti kurti vaiko atstovus ir priskirti jiems rolę. Pirminis slaptažodis - toks pats kaip naudotojo prisijungimo vardas. Administratorius gali nustatyti slaptažodį į numatytąjį (pirminį). Naudotojas prisijungęs gali pasikeisti slaptažodį į bet kokį norimą slaptažodį. Apribojimai keičiamam slaptažodžiui:
slaptažodis turi būti ne mažiau 8 simbolių ilgio, turi būti bent viena didžioji ir bent viena mažoji raidė, ir bent vienas skaičius.
2.	Užregistruoti prašymą lankyti ikimokyklinio švietimo įstaigą.
Prašymas yra registruojamas prisijungus prie IS nurodant tėvų/globėjų ir vaiko asmeninius duomenis ir pasirenkant daugiausiai 5 įstaigas pagal šeimos pageidaujamą prioritetą. Taip pat pasirenkami prioriteto kriterijai, turintys įtakos pirmumui.
3.	Valdyti savo (tėvų) duomenis sistemoje.
Tėvai/globėjai, prisijungę prie sistemos gali atnaujinti savo kontaktinius duomenis, sukurti ar atšaukti naujus prašymus lankyti įstaigas. Naujas prašymas anuliuoja prieš tai esantį aktyvų prašymą.
4.	Sukurti paskyras vidiniams sistemos naudotojams
Administratorius turi galėti kurti papildomas paskyras, reikalingas savivaldybės švietimo specialistams.
5.	Sukurti laukiančiųjų eilę
Sistemoje turi būti galimybė sukurti eilę į kurią bus registruojami visi prašymai (pvz.
2021 pirmasis kvietimas į darželius). Turi būti galimybė sustabdyti registracijų priėmimą.
6.	Sistema surūšiuoja registracijų sąrašą ir pasiūlo patvirtinimui
Turi būti galimybė inicijuoti registracijų rūšiavimą pagal savivaldybės kriterijus.
Surūšiuoti duomenys turi būti išvesti į vartotojo sąsąją ir pateikti patvirtinimui. Patvirtinus sąrašą jis turi būti išsaugomas. Turi būti galimybė užrakinti ir atrakinti sąrašo redagavimą (administratoriui).
7.	Koreguoti priskyrimo darželiui duomenis
Švietimo specialistas turi turėti galimybę koreguoti surūšiuotus duomenis, kol jie dar nėra patvirtinti.
8.	Sudaryti laukiančių vaikų eilę pagal prioritetus.
Nepriskirti grupėms vaikai yra surikiuojami (pagal tuos pačius kriterijus) į laukiančiųjų eilę su eilės numeriu.
9.	Pateikti statistinius duomenis (tėvams ir švietimo specialistams):
●	Peržiūrėti visų užregistruotų, priimtų ir eilėje laukiančių vaikų skaičius;
●	Peržiūrėti pagal prioritetus darželių pavadinimus (1, 2, 3, 4, 5 prioritetas); ●	Peržiūrėti eilėje laukančius prašymus pagal prioritetus (įstaigų sąrašas pagal 1, 2, 3, 4, 5 prioritetą).
10.	Archyvuoti asmens duomenis.
Pagal tėvų reikalavimą pašalinti jo duomenis iš sistemos (pateiktą kitais kanalais), administratorius (prieš panaikinimo archyvavimą) turi turėti galimybę suarchyvuoti visus pareiškėjo duomenis, kad galima būtų juos pateikti persiuntimui. Turi būti galimybė peržiūrėti archyvą.
