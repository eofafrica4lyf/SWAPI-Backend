require("dotenv").config();
const Movie = require("../../services/Movie");
const sinon = require("sinon");
const axios = require("../../axios");
const chai = require("chai");
const expect = chai.expect;
const publicIp = require("public-ip");

let moviesStub = {
    data: {
        "count": 5,
        "next": null,
        "previous": null,
        "results": [
            {
                "episode_id": 4,
                "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
                "release_date": "1977-05-25"
            },
            {
                "episode_id": 5,
                "opening_crawl": "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
                "release_date": "1980-05-17"
            },
            {
                "episode_id": 6,
                "opening_crawl": "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
                "release_date": "1983-05-25"
            },
            {
                "episode_id": 1,
                "opening_crawl": "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....",
                "release_date": "1999-05-19"
            },
            {
                "episode_id": 2,
                "opening_crawl": "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared their\r\nintentions to leave the Republic.\r\n\r\nThis separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\nmade it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\npeace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\nQueen of Naboo, is returning\r\nto the Galactic Senate to vote\r\non the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....",
                "release_date": "2002-05-16"
            }
        ]
    },
    somethingelse: ""
}
let axiosStub;
describe('Movie', () => {
    describe('getAll Service', () => {
        before(async function () {
            axiosStub = sinon.stub(axios, "get");
        })
        it("should successfully get a list of all movies on the SWAPI", async function () {
            axiosStub.returns(moviesStub);
            const result = await Movie.getAll();
    
            expect(result.count).to.be.equal(5);
            expect(result.previous).to.be.null;
            expect(result.results.length).to.be.equal(5);
        })
        it("should throw if an an error occurs", async function () {
            axiosStub.throws("ksdfs");
            try {
                await Movie.getAll();
            } catch (error) {
                expect(error.message).to.be.equal("Some error occured");
                expect(error.statusCode).to.be.equal(500);
            }
        })
        after(async function() {
            axiosStub.restore();
        })
    })//end of getAll Service

    describe('addComment Service', () => {
        before(async function () {
            sinon.stub(publicIp, "v4").returns("46.5.21.12345");
        })
        it("should successfully post a comment on a movie", async function () {
            const data = {
                movieId: 1,
                comment: "Some comment"
            }
            const newComment = await Movie.addComment(data)

            expect(newComment.publicIp).to.be.equal("46.5.21.12345")
            expect(newComment.movieId).to.be.equal(data.movieId)
            expect(newComment.comment).to.be.equal(data.comment)
            await newComment.destroy()
        })
        after(async function () {
            publicIp.v4.restore();
        })
    })//end of addComment Service
})

