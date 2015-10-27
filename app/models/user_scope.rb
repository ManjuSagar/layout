module UserScope

  def self.included(klass)
    klass.class_eval do

      def admin(current_user)
        current_user.present? and current_user.user_type == 'Admin'
      end

      def affilator(current_user)
        current_user.present? and current_user.user_type == 'Campaign'
      end

      def campaign(current_user)
        current_user.present? and current_user.user_type == 'Campaign'
      end

      def drawable(current_user)
        current_user.user_type == 'Campaign' || current_user.user_type == 'Affiliate'
      end
    end
  end
end