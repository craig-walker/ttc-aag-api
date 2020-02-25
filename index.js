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
  max: 100, // 100 requests,
} )

const postLimiter = rateLimit( {
  windowMs: 1 * 60 * 1000,
  max: 30,
} )

const app = express()

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( cors( origin ) )
app.use( compression() )
app.use( helmet() )
app.use( limiter )

const getAvatars = ( request, response ) => {
  const avatar = request.query.avatar || '%';
  const participantage = request.query.participantage || '%';
  const participantoccupation = request.query.participantoccupation || '%';
  const participantlocation = request.query.participantlocation || '%';
  const workshop = request.query.workshop || '%';
  pool.query( 'SELECT * FROM avatars WHERE CAST(avatar AS TEXT) LIKE $1 AND participantage LIKE $2 AND participantoccupation LIKE $3 AND participantlocation LIKE $4 AND CAST(workshop AS TEXT) LIKE $5',
    [avatar, participantage, participantoccupation, participantlocation, workshop],
    ( error, results ) => {
    if ( error ) {
      throw error
    }
    response.status( 200 ).json( results.rows )
  } )
}

const getAvatarsById = (request, response) => {
  const id1 = parseInt( request.query.id1 );
  const id2 = parseInt( request.query.id2 ) || '0';
  const id3 = parseInt( request.query.id3 ) || '0';
  console.log( id1 + ', ' + id2  + ', ' + id3 );
  pool.query('SELECT * FROM avatars WHERE id = $1 OR id = $2 OR id = $3', [id1, id2, id3], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app
.route( '/avatars' )
// GET endpoint
.get( getAvatars )

app
.route( '/my-avatars?:id' )
.get( getAvatarsById )

// POST endpoint
app.post(
  '/avatars',
  [
    check( 'avatar' ).not().isEmpty().isInt( { min: 1, max: 3 } ),
    check( 'skintone' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'jawline' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'nose' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'beard' ).isLength( { min: 0, max: 255 } ).trim(),
    check( 'haircolour' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'hairlength' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'hairline' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'eyecolour' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'eyeshape' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'eyebrows' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'lips' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'participantage' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'participantoccupation' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'participantlocation' ).not().isEmpty().isLength( { min: 1, max: 255 } ).trim(),
    check( 'workshop' ).not().isEmpty()
  ],
  postLimiter,
  ( request, response ) => {
    const errors = validationResult( request )

    if ( !errors.isEmpty() ) {
      return response.status( 422 ).json( { errors: errors.array() } )
    }

    const {
      avatar,
      skintone,
      jawline,
      nose,
      beard,
      haircolour,
      hairlength,
      hairline,
      eyecolour,
      eyeshape,
      eyebrows,
      lips,
      participantage,
      participantoccupation,
      participantlocation,
      workshop
    } = request.body

    pool.query(
      'INSERT INTO avatars (avatar, skintone, jawline, nose, beard, haircolour, hairlength, hairline, eyecolour, eyeshape, eyebrows, lips, participantage, participantoccupation, participantlocation, workshop) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id, avatar',
      [ avatar, skintone, jawline, nose, beard, haircolour, hairlength, hairline, eyecolour, eyeshape, eyebrows, lips, participantage, participantoccupation, participantlocation, workshop ],
      ( error, result ) => {
        if ( error ) {
          throw error
        }
        response.status( 201 ).json( { status: 'success', message: 'Avatar added.', id: result.rows[0].id, avatar: result.rows[0].avatar } )
      } )
  }
)

// Start server
app.listen( process.env.PORT || 3002, () => {
  console.log( `Server listening` )
} )
