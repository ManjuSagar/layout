class BuildController < ApplicationController

  def download
    File.open("example.html", 'w') {|f| f.puts(params[:layout])}
    render json: {:zip => params[:zip_required]}
  end

  def download_file
    file = File.open("example.html", 'r');
    send_file file.path, x_sendfile: true
  end

  def zip
    path = CustomComponent.mak_zip_file
    send_data(path[0], :type => 'application/zip', :filename => path[1])
  end

end
