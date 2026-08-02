Willkommen in meinem Umbraco Portfolio Projekt!

Ich freue mich, dass du hier bist. Ich habe diese Website gebaut, um meine Projekte und mein Wissen im Bereich Webentwicklung zu zeigen. Es ist nicht nur eine statische Seite. Im Hintergrund arbeitet ein echtes Content Management System. Dadurch kann ich meine Inhalte jederzeit direkt im Browser bearbeiten, ganz ohne den Code anfassen zu müssen.

TECHNISCHE DETAILS

Die Basis für dieses Projekt bilden Umbraco 13 und das moderne DOTNET 8 Framework. Anstelle einer großen und teuren Datenbank nutze ich SQLite. Das macht das gesamte Projekt wunderbar leichtgewichtig und sehr einfach zu verwalten.

Ein besonderes Highlight ist der dynamische Bereich für meine Fähigkeiten auf der Startseite. Wenn ich eine neue Technologie lerne, muss ich nicht mehr in den Code eingreifen. Ich melde mich einfach im Umbraco Backend an, schreibe das neue Werkzeug in ein Textfeld, und die Website erstellt automatisch das passende und schöne Design dafür.

HOSTING AUF AZURE

Die Website läuft in der Microsoft Azure Cloud, genau genommen auf einem kostenlosen Windows App Service. Der Weg dorthin war extrem lehrreich. Anfangs gab es Herausforderungen mit dem Dateisystem, da die Kombination aus freigegebenen Cloud Speichern und SQLite Datenbanken manchmal zu Dateisperren führt.

Die Lösung bestand darin, von Linux auf Windows zu wechseln und die Art der Veröffentlichung anzupassen. Anstatt die App als komprimiertes Paket hochzuladen, was das gesamte Dateisystem komplett sperrt, nutze ich eine Methode, die die Ordnerstruktur offenlässt. Nur so kann Umbraco neue Bilder im Media Ordner speichern und die SQLite Datenbank bleibt jederzeit beschreibbar.

LOKAL STARTEN

Wenn du dir das Projekt auf deinem eigenen Computer ansehen möchtest, geht das ganz leicht. Du brauchst nur Visual Studio Code und die passenden DOTNET Werkzeuge.

1. Lade dir den gesamten Code herunter.
2. Öffne den Projektordner in Visual Studio Code.
3. Starte die Anwendung über dein Terminal.
4. Das Administrationsmenü von Umbraco erreichst du, indem du einfach das Wort umbraco mit einem Schrägstrich an die lokale Adresse anhängst.

Danke fürs Vorbeischauen und viel Freude beim Erkunden!
