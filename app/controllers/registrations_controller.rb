class RegistrationsController < Devise::RegistrationsController

  private

  def after_sign_up_path_for(resource)
    reset_session
    root_path
  end

end