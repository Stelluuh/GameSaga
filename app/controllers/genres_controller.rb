class GenresController < ApplicationController
    def index
        render json: Genre.all
    end

    private

end
