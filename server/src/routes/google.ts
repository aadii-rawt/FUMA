import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { prisma } from "../lib/prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken: string, _refreshToken: string, profile: Profile, done) => {
      try {
        const email =
          profile.emails && profile.emails[0]?.value
            ? profile.emails[0].value.toLowerCase()
            : "";

        if (!email) return done(new Error("Google did not return an email"));

        let user = await prisma.users.findUnique({ where: { email } });

        if (!user) {     
          user = await prisma.users.create({
            data: { email },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

export default passport;
