class AffiliatesController < ApplicationController
  before_filter :find_affiliate, only: [:edit, :destroy, :show]

  def new
    @affiliate = Affiliate.new
  end

  def index
    @affiliates = Affiliate.all.paginate(page: params[:page], per_page: 5)
  end

  def create
    @affiliate = Affiliate.create(campagin_params.merge!(created_user_id: User.current.id))
    if @affiliate.save
      flash[:success] = "Campaign created!"
      redirect_to affiliates_index_path
    else
      render 'new'
    end
  end

  def update
    @affiliate = Affiliate.find(params[:format])
    @affiliate.update_attributes(campagin_params)
    if @affiliate.save
      flash[:success] = "Campaign created!"
      redirect_to affiliates_index_path
    else
      render 'edit'
    end
  end

  def destroy
    @affiliate.destroy
    redirect_to affiliates_index_path
    flash[:success] = "Campaign created!"
  end

  private

  def find_affiliate
    @affiliate = Affiliate.find(params[:id])
  end

  def campagin_params
    params[:affiliate].permit(:first_name, :last_name, :email, :password, :phone_number, :address, :city)
  end

end