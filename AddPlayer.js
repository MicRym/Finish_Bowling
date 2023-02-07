
class PlayerClass
{
    name;
    score;
    points;
    id;
    id_number;
    bPointCountStarted;
    bPointFromOneFigure;
    constructor(id, idNumber)
    {
        this.name="";
        this.score=0;
        this.id=id;
        this.id_number=idNumber;
        this.points=0;
        this.bPointCountStarted =false;
        this.bPointFromOneFigure =false;
    }
    get CurrentScore()
    {
        return this.score
    }
    addScore()
    {
        this.score+=this.points;
        this.points=0;
        this.bPointCountStarted =false;
        this.bPointFromOneFigure =false;
    }
    setIdNumber( idNumber)
    {
        this.id_number= idNumber;
    }
    get Id()
    {
        return this.id;
    }
    addPoints(points)
    {
        if(!this.bPointCountStarted)
        {
            this.points = points;
            this.bPointCountStarted =true;
            this.bPointFromOneFigure =true;
        }
        else if(this.bPointFromOneFigure )
        {
            this.points = 2;
            this.bPointFromOneFigure =false;
        }
        else
        {
            this.points++;
        }
        if(this.points>50)
        {
            this.points = 25;
        }
    }
}


function setButtonClick( ID, Player)
{
    $(ID).ready(function(){
        var button = document.getElementById(ID).querySelectorAll('.button_type1');
        //console.log(button);
        $(button).off("click");
        $(button).click(function(){
            Player.addPoints(Number(this.innerHTML));
            $(this).css("background-color", "rgb(230, 130, 135)");
            $(this).disabled = true;
            
        })
    });
}
function setApplyScoreClick( ID, Player)
{
    $(ID).ready(function(){
        var ScoreText = document.getElementById(ID).querySelector(".Player_Score");
        var button = document.getElementById(ID).querySelectorAll('.button_type2');
        var buttonToChange = document.getElementById(ID).querySelectorAll('.button_type1');
        console.log(button);
        $(button).off("click");
        $(button).click(function(){
            Player.addScore();
            ScoreText.innerHTML = Player.score;
            $(buttonToChange).css("background-color", "rgb(227, 231, 168)");
            $(buttonToChange).disabled = true;

        })
    });
}

function clonePlayerContent( iCloneIndex, Players )
{
    var AddPlayerButton = document.getElementById("AddPlayer");
    var PlayersContainer = document.getElementById("PlayersContainer");
    AddPlayerButton.onclick = function(){
        iCloneIndex++;
        var PlayerContent = document.getElementById("Player_Content_0")
        var ClonedPlayerContnent = PlayerContent.cloneNode(true);

        ClonedPlayerContnent.id = "Player_Content_" + iCloneIndex; 
        PlayersContainer.appendChild(ClonedPlayerContnent);
        console.log(iCloneIndex);

        Players.push(new PlayerClass(ClonedPlayerContnent.id, iCloneIndex));

        setButtonClick(ClonedPlayerContnent.id, Players[iCloneIndex]);
        setApplyScoreClick(ClonedPlayerContnent.id, Players[iCloneIndex]);
    } 
}
window.onload = function(){
    var iCloneIndex = 0;
    var PlayerContent = document.getElementById("Player_Content_0")
    var Player = new PlayerClass(PlayerContent.id,iCloneIndex)
    Players = [Player];
    setButtonClick(PlayerContent.id, Players[iCloneIndex]);
    setApplyScoreClick(PlayerContent.id, Players[iCloneIndex]);
    clonePlayerContent( iCloneIndex, Players);
}
