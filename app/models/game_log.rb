# class GameLog < ApplicationRecord
#   belongs_to :game
#   belongs_to :user

#   # STATUS_OPTIONS = {
#   #   0 => "Not Started",
#   #   1 => "In Progress",
#   #   2 => "Did Not Finish",
#   #   3 => "Complete",
#   #   4 => "Wishlist"
#   # }

#   validates :status, presence: true, inclusion: { in: ['Not Started', 'In Progress', 'Did Not Finish', 'Complete', 'Wishlist'] }
#   validates :date_started, allow_blank: true
#   validates :date_stopped, allow_blank: true
#   validates :date_completed, allow_blank: true
#   validates :play_time, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
#   validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
#   # validates :status, presence: true, inclusion: { in: STATUS_OPTIONS.keys }
  

#   # private

#   # def display_status
#   #   STATUS_OPTIONS[status]
#   # end
# end

class GameLog < ApplicationRecord
  belongs_to :game
  belongs_to :user

  validates :status, inclusion: { in: ['Not Started', 'In Progress', 'Did Not Finish', 'Complete', 'Wishlist'] }
  validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }, allow_nil: true
  validates :date_started, presence: true
  validates :date_stopped, presence: true, if: :completed?
  validates :date_completed, presence: true, if: :completed?
  validates :play_time, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true

  private

  def completed?
    status == 'Complete'
  end
end
