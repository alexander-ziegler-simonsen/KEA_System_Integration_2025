# Federated Identities Service 

you are using an existing account to login to other websites.
eksamples are:
- facebook
- google
- reddit
- linkedin
- microsoft
- github

this way you don't need to make a new account, since you can just use the one you all ready have.

## google

I wanted to use google, since that could be the biggest pool of accounts.

Found these links of good infomation
- https://developers.google.com/identity/openid-connect/openid-connect 
- https://cloud.google.com/nodejs/docs/reference/google-auth-library/8.1.1 
- - https://github.com/googleapis/google-auth-library-nodejs

found out that the pack is not I'm looking for.

- https://privacysandbox.google.com/cookies/fedcm
- - https://privacysandbox.google.com/cookies/fedcm/why
- - https://privacysandbox.google.com/cookies/fedcm/implement/identity-provider
- - https://privacysandbox.google.com/cookies/fedcm/implement/relying-party 
- - https://privacysandbox.google.com/private-advertising/topics/web/setup
- - https://developers.google.com/identity/gsi/web/guides/fedcm-migration



# SSO (single sign-on)

SSO is one sign on, that works for everything, but usaly only in house.

a way of looking at SSO is when you start a new job in a tech company, then you get some credentials (normally username and password) that works in multiple places.
this credentials can be used with:
- company emails
- company payroll
- company bug database

## SSO systems 

here is a list of tools/web services, that can be used as SSO
- https://www.keycloak.org/
- https://workos.com/
- https://auth0.com/
- https://www.onelogin.com/product/ciam
- https://frontegg.com/

# Federated Identity Management vs SSO 

## Federated Identity Management

### pros
- easier to intergrate, since everything is being maintain by theid parties (no need to build the backend).
- faster to intergrate, since it most cases it just a post call to some services

### cons 
- some data could be collected about your online activities, that you don't want to share.
- your account you used (google, linkedin, reddit) could display publicly, that you connected your account to something, that you don't want the world to know.
- - linkedin user 'Kim FakeName' just connected his account to 'I-love-war-chat', 'evil-forum', 'and so on'

## SSO

text.

### pros
- nothing will be shared with the outside world, unless you your self share any of it.

### cons
- SSO needs you to have the backend sat up already.
- you stand for 24/7 maintaining.
- you have to maintain all security, which is a full time job to keep up with.