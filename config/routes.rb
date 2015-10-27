Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".


  # You can have the root of your site routed with "root"
   root 'welcome#dashboard'

  get 'layoutit' => 'welcome#index1', as: :layout
  get 'login' => 'welcome#login', as: :login

  get 'build/download_file', :to => 'build#download_file'
  get 'build/download_file/zip', :to => 'build#zip'
  post 'build/download', :to => 'build#download'
  get 'affiliates_list' => 'users#affiliates_list'
  get 'container' => 'welcome#container'
  
  get '/container_comp/:id' => 'welcome#container_comp'
  get 'component_display' => 'welcome#component_display'
  post 'component/update_component'
  get 'preview' => 'welcome#preview'

  # resources :users
  # get 'users/add_user' => 'users#new', as: :add_user
  # post 'users/create_user' => 'users#create_', as: :create_user

  post "component/save_component"
  get 'component/list_components', as: :custom_components_list

  get 'home/index' => 'home#index'
  post 'campaigns' => 'campaigns#create'
  get 'campaigns/new' => 'campaigns#new'
  get 'campaigns/index' => 'campaigns#index'
  get 'campaigns/edit/:id' => 'campaigns#edit'
  patch 'campaign' => 'campaigns#update'
  delete 'campaigns/destroy/:id' => 'campaigns#destroy'

  post 'affiliates' => 'affiliates#create'
  get 'affiliates/new' => 'affiliates#new'
  get 'affiliates/index' => 'affiliates#index'
  get 'affiliates/edit/:id' => 'affiliates#edit'
  patch 'affiliate' => 'affiliates#update'
  delete 'affiliates/destroy/:id' => 'affiliates#destroy'
  get 'affiliates/show/:id' => 'affiliates#show'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
