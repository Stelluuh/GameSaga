class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create] 

    def create
    end

    def destroy
    end

end
