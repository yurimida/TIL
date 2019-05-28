package gameProject;

public class HelloWorld {

    public static void main(String []args){
        
        PlayerCharacter player = new PlayerCharacter("gamepari", 100, 12);
        EnemyCharacter enemy = new EnemyCharacter("Orc", 80, 5);
        
        while(player.isLive() && enemy.isLive()) {
            player.attack(enemy);
            if (!enemy.isLive()) break;
            enemy.attack(player);
            System.out.println("-------------------");
        }
        
        if (player.isLive()) {
            System.out.println(" player win!");
        }
        else {
            System.out.println(" enemy win!");
        }
        
        
      
     }
}