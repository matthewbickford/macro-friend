\echo 'Delete and recreate Macro-Friend db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE macro_friend;
CREATE DATABASE macro_friend;
\connect macro_friend

\i macro-friend-schema.sql
\i macro-friend-seed.sql

\echo 'Delete and recreate macro_friend_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE macro_friend_test;
CREATE DATABASE macro_friend_test;
\connect macro_friend_test

\i macro-friend-schema.sql