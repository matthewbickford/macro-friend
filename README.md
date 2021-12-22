# MacroFriend

## API

MacroFriend uses the Nutritionix free tier API to source nutritional information. In order to run MacroFiend on a local machine, users will have to get their own API key from Nutritionix. More information about the API can be found below.
[https://www.nutritionix.com/business/api](https://www.nutritionix.com/business/api)

## Requirements

Macrofriend runs uses Node.js and Postgres. In order to run the application locally you will need to have Postgres 13 and Node.js 14 or greater installed.

psql < macro-friend.sql

\echo 'Delete and recreate macro_friend db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE macro_friend;
CREATE DATABASE macro_friend;
\connect macro_friend

\i macro-friend-schema.sql
\i macro-friend-seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE macro_friend_test;
CREATE DATABASE macro_friend_test;
\connect macro_friend_test

\i macro-friend-schema.sql
