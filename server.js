const express = require('express');
const cors = require('cors');
const fs = require('fs');

var bodyParser = require('body-parser')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/jobs', (req, res) => {
    let rawdata = fs.readFileSync('jobs.json');
    let jobs = JSON.parse(rawdata);

    res.json({
        jobs: JSON.stringify(jobs)
    });
});

app.delete('/deleteJob/:jobId', (req, res) => {
    const jobId = req.params.jobId;

    let rawdata = fs.readFileSync('jobs.json');
    let jobs = JSON.parse(rawdata);
    jobs = jobs.filter((job) => { return job.id != jobId });

    fs.writeFile("jobs.json", JSON.stringify(jobs),
    {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    },
    (err) => {
        if (err) {
            res.json({
                message: `Error Happend: Please try again!`
            });
        }
        else {
            res.json({
                message: `Deleted Sucessfully`
            });
        }
    });
});

app.post('/addJob', (req, res) => {
    const job = req.body.job;

    let rawdata = fs.readFileSync('jobs.json');
    let jobs = JSON.parse(rawdata);
    job.id = jobs.length;
    jobs.push(job);
    console.log(jobs);

    fs.writeFile("jobs.json", JSON.stringify(jobs),
    {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    },
    (err) => {
        if (err) {
            res.json({
                message: `Error Happend: Please try again!`
            });
        }
        else {
            res.json({
                message: `Added Sucessfully`
            });
        }
    });
});

app.patch('/editJob', (req, res) => {
    const job = req.body.job;

    let rawdata = fs.readFileSync('jobs.json');
    let jobs = JSON.parse(rawdata);
    let index = jobs.findIndex(function(j){
        return j.id === job.id
    });

    jobs[index] = job;

    fs.writeFile("jobs.json", JSON.stringify(jobs),
    {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    },
    (err) => {
        if (err) {
            res.json({
                message: `Error Happend: Please try again!`
            });
        }
        else {
            res.json({
                message: `Editted Sucessfully`
            });
        }
    });
});

app.listen(2020, () => {
    console.log('server is listening on port 2020');
});