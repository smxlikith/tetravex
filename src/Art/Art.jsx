import "./Art.css"

export default function Art({loadingScreen=true}){
    return(
        <div className="heading-container flex justify-center items-center">
            <h1 className={`!text-[8vh] sm:!text-[8vw] game-heading ${loadingScreen ? "loading-screen": ""}`}>TETRAVEX</h1>
        </div>
    ) 
}