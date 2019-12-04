# Sprint Backlog

## Sprint #1 

**Sprint goal**: Implement sign-up and log-in functionality, develop Line Placing, Writing a Review and Reading a Review API

**Expected sprint duration**: 21/11/2019 - 24/11/2019

**Product backlog items**:

| ID   | Title            | Imp (1) | Est (2) | Description                                                                                                         |
| ---- | ---------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `01` | Login/Signup     | 100     | 70      | The user can signup and login and the system will maintain his personal data                                        |
| `02` | Line Placing     | 80      | 10      | The user can tap on two different points of the screen and the system will log them as a geolocalized virtual line* |
| `03` | Writing a Review | 70      | 40      | The user can add a review to a line                                                                                 |
| `04` | Reading a Review | 60      | 30      | The user can read the reviews that other users have previously added to the system                                  |

**Needed work**:

* Set up the project skeleton.
* Create GET and POST handlers for sign-up, log-in, and user retrieval (`01`), using hash-salt tecniques for authentication.
* Create GET and POST handlers for line placing (`02`).
* Create GET and POST handlers for review handling (`03`, `04`).
* Document and write tests for the features above.

### Results

The actual sprint duration was *21/11/2019 - 04/12/2019*. The sprint lasted more than expected due to a lack of experience and technical problems.

At the end of the sprint, we managed to successfully implement backlog items `01` to `04`. In addition, we also managed to deliver feature `05`. For these backlog items, we implemented the code part.

In addition to the backlog items, the Database layer was successfully implemented with all entities, Travis was set up along with Jest and some tests were made.

## Sprint #2 (05/12/2019 -)

**Sprint goal**: Implement pictures in reviews, danger signalling, and user ranks.

**Expected sprint duration**: 05/12/2019 - 09/12/2019

**Product backlog items**:

| ID   | Title               | Imp (1) | Est (2) | Description                                                                               |
| ---- | ------------------- | ------- | ------- | ----------------------------------------------------------------------------------------- |
| `08` | Pictures in Reviews | 30      | 80      | The user can add pictures to a review                                                     |
| `09` | Danger Signalling   | 40      | 10      | The user can pin a dangerous place on a map                                               |
| `10` | User Ranks          | 10      | 15      | Users are divided into ranks depending on the amount of interactions made with the system |

**Needed work**:

* Implement authentication check for all services.
* Update GET handler for review including pictures linked to that review, and create additional GET handlers for photos (`08`).
* Create a new DB table for dangerous places and create GET and POST handlers for it (`09`).
* Develop an algorithm for calculating user ranks (`10`).
* Document and write tests for the features above.

## Table notation

(1): Importance (out of 100)

(2): Estimation of Cost
