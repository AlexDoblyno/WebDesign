# WebDesignCS260
## Who is the Spy
### Elevator Pitch
I'm developing a lightweight web-based social game called Who's the Spy.
Players simply open the webpage—no downloads required—to instantly join games with friends or strangers.
The rules are straightforward: the majority receive identical words, while a minority of spies receive slightly different ones. Each round, players take turns describing their word, attempting to prove they aren't the spy while simultaneously hunting down the hidden adversary.
The fun lies in communication and deduction: you must conceal your own word while cleverly discerning who is lying.

### Visual Design

### Key features

- Secure login over HTTPS
- Display of Voting Players
- Ability for each user only see their own word
- Ability for admin to remove player and restart the game

### Technologies

I am going to use the required technologies in the following ways:

- **HTML** - Uses correct HTML structure for application. Two(Three) HTML pages. One(Two) for login/Register and one for gaming. 
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast, and unique display for each player. Adding function that skip 'voted' player, and compare player numbers from different faction.
- **React** - Provides login, applying votes, display voting result, and use of React for routing and components.
- **Service** - Backend service with endpoints for:
  - login
  - Compare Player Numbers
  - Skip Player
  - submitting votes
  - retrieving vote status
- **DB/Login** - Store users, and votes in database. Register and login users. Credentials securely stored in database.
- **WebSocket** - As each user votes, their votes are broadcast to all other users.
