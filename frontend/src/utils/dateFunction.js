export function formateReleaseDate(date){
    return new Date(date).toLocaleDateString("en-us",{
        year:"numeric",
        month:"long",
        day:"numeric",
    })
}