const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const cors = require( 'cors' )
const { pool } = require( './config' )
const helmet = require( 'helmet' )
const compression = require( 'compression' )
const rateLimit = require( 'express-rate-limit' )
const { body, check, validationResult } = require( 'express-validator' )

const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://ttc-aag.netlify.com' : '*',
}

const limiter = rateLimit( {
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests,
} )

const postLimiter = rateLimit( {
  windowMs: 1 * 60 * 1000,
  max: 10,
} )

const app = express()

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( cors( origin ) )
app.use( compression() )
app.use( helmet() )
app.use( limiter )

const getAvatars = ( request, response ) => {
  pool.query( 'SELECT * FROM avatars', ( error, results ) => {
    if ( error ) {
      throw error
    }
    response.status( 200 ).json( results.rows )
  } )
}

app
.route( '/avatars' )
// GET endpoint
.get( getAvatars )

// POST endpoint
app.post(
  '/avatars',
  [
    check( 'avatar' ).not().isEmpty().isInt( { min: 1, max: 2 } ),
    check( 'skinTone' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'jawLine' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'nose' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'beard' ).isLength( { min: 0, max: 255 } ).trim(),
    check( 'hairColour' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'hairLength' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'hairLine' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'hairTexture' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'eyeColour' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'eyeShape' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'eyeBrows' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'cheek' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'lips' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'participantAge' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'participantOccupation' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'participantLocation' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
  ],
  postLimiter,
  ( request, response ) => {
    const errors = validationResult( request )

    if ( !errors.isEmpty() ) {
      return response.status( 422 ).json( { errors: errors.array() } )
    }

    const {
      avatar,
      skinTone,
      jawLine,
      nose,
      beard,
      hairColour,
      hairLength,
      hairLine,
      hairTexture,
      eyeColour,
      eyeShape,
      eyeBrows,
      cheek,
      lips,
      participantAge,
      participantOccupation,
      participantLocation
    } = request.body

    pool.query(
      'INSERT INTO avatars (avatar, skinTone, jawLine, nose, beard, hairColour, hairLength, hairLine, hairTexture, eyeColour, eyeShape, eyeBrows, cheek, lips, participantAge, participantOccupation, participantLocation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
      [ avatar, skinTone, jawLine, nose, beard, hairColour, hairLength, hairLine, hairTexture, eyeColour, eyeShape, eyeBrows, cheek, lips, participantAge, participantOccupation, participantLocation ],
      error => {
        if ( error ) {
          throw error
        }
        response.status( 201 ).json( { status: 'success', message: 'Avatar added.' } )
      } )
  }
)

// Start server
app.listen( process.env.PORT || 3002, () => {
  console.log( `Server listening` )
} )
