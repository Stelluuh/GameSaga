class GenresController < ApplicationController
    def index
        render json: Genre.all
    end

    def show
        genre = Genre.find(params[:id])
        render json: genre
    end

    def create
        genre = Genre.create!(genre_params)
        render json: genre, status: :created
    end

    private

    def genre_params
        params.permit(:name)
    end
end
