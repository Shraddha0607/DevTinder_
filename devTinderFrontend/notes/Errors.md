1) Always make sure useState() must initialize in start. Whether wiht empty string.

2) withCredential vs  withCredentials
Your API returns 200 because the request itself succeeds,
but the browser never sends the cookie, so the backend doesn’t know which token to delete.

withCredential ❌ vs withCredentials ✅ affects cookie handling, not the HTTP request success.




NOTES:

1) fetch, axios => any can use to fetch API data
 
2) for testing, put default code, so that noot needed to fill form again and again

3) IIS
4) ctrl + shift + M => show the problem , (you can filter out) in VS code