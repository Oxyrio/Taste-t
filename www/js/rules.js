/*{
    "rules": {
    "users": {
        ".write": true,
            "$uid": {
            ".read": "auth != null && auth.uid == $uid"
        }
    }
}
}