class CampaignsController < ApplicationController
  before_filter :find_campaign, only: [:edit, :destroy]

  def new
    @campaign = Campaign.new
  end

  def index
    @campaigns = Campaign.all.paginate(page: params[:page], per_page: 5)
  end

  def create
    @campaign = Campaign.create(campaign_params)
    if @campaign.save
      flash[:success] = "Campaign created!"
      redirect_to campaigns_index_path
    else
      render 'new'
    end
  end

  def update
    @campaign = Campaign.find(params[:format])
    @campaign.update_attributes(campaign_params)
    if @campaign.save
      flash[:success] = "Campaign created!"
      redirect_to campaigns_index_path
    else
      render 'edit'
    end
  end

  def destroy
    @campaign.destroy
    redirect_to campaigns_index_path
    flash[:success] = "Campaign created!"
  end

  private

  def find_campaign
    @campaign = Campaign.find(params[:id])
  end

  def campaign_params
    params[:campaign].permit(:first_name, :last_name, :email, :password, :address, :name)
  end

end