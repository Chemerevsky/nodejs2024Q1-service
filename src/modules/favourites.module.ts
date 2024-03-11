import { Module } from '@nestjs/common';
import { FavouritesController } from '../controllers/favourites.controller';
import { FavouritesService } from '../services/favourites.service';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
