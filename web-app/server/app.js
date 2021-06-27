'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');
const path = require('path');
const fs = require('fs');

let network = require('./fabric/network.js');