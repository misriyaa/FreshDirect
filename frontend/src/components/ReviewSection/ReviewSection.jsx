import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './ReviewSection.css'

function ReviewSection() {
  // Live local review storage array
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Nafeesathul Misriya",
      rating: 5,
      date: "May 22, 2026",
      comment: "The Cavendish bananas arrived perfectly firm and unbruised. Exceptional packing and super fast delivery. Will order weekly!"
    },
    {
      id: 2,
      author: "Rahul Sharma",
      rating: 4,
      date: "May 18, 2026",
      comment: "Very crisp carrots and spinach. Pushed my score down by one star only because the cucumber delivery got delayed by a few hours."
    }
  ]);

  // Collapsible Form Management States
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Dynamic Metrics Mathematical Aggregates 
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews || 0).toFixed(1);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!newName.trim() || !newComment.trim()) {
      toast.error("Please fill in your name and review text.");
      return;
    }

    const compiledReview = {
      id: Date.now(),
      author: newName,
      rating: Number(newRating),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comment: newComment
    };

    setReviews([compiledReview, ...reviews]);
    toast.success("Review published successfully!");
    
    // Clear Input Streams
    setNewName('');
    setNewRating(5);
    setNewComment('');
    setIsFormOpen(false);
  };

  const renderStars = (count, size = "14") => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill={i < count ? "#f59e0b" : "#e2e8f0"}
        style={{ marginRight: '1px' }}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ));
  };

  return (
    <div className="review-section-container-split">
      
      {/* ================= LEFT COLUMN: OVERALL TOTAL METRICS SUMMARY ================= */}
      <div className="review-left-summary-panel">
        <div className="sticky-summary-box-card">
          <span className="panel-micro-tag-header">RATINGS & REVIEWS</span>
          <h2 className="big-rating-score-num">{averageRating}</h2>
          <div className="stars-row-center">{renderStars(Math.round(averageRating), "22")}</div>
          <p className="total-reviews-count-text">Based on {totalReviews} verified purchases</p>

          {/* Distribution Progress Bars Stack */}
          <div className="rating-distribution-bars-column">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter(r => r.rating === stars).length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="distribution-line-row">
                  <span className="dist-star-label">{stars} ★</span>
                  <div className="dist-bar-track-bg">
                    <div className="dist-bar-fill-indicator" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="dist-count-readout">{count}</span>
                </div>
              );
            })}
          </div>

          <button 
            className="cta-button write-review-trigger-btn-override"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? "✕ Close Form Panel" : "✏️ Write a Customer Review"}
          </button>
        </div>
      </div>

      {/* ================= RIGHT COLUMN: LIVE REVIEWS FEED & COMPOSER ================= */}
      <div className="review-right-feed-panel">
        
        {/* COLLAPSIBLE INPUT FORM DRAWER WRAPPER */}
        <div className={`review-form-collapsible-drawer ${isFormOpen ? "is-open" : ""}`}>
          <form onSubmit={handleSubmitReview} className="review-input-form-box">
            <h3>Share Feedback on this Harvest</h3>
            <div className="form-double-grid-row">
              <div className="form-input-stack-cell">
                <label>Your Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Misriya" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  className="review-text-field"
                />
              </div>
              <div className="form-input-stack-cell">
                <label>Produce Rating</label>
                <select 
                  value={newRating} 
                  onChange={(e) => setNewRating(e.target.value)}
                  className="review-select-dropdown"
                >
                  <option value="5">5 Stars — Fresh & Unmatched</option>
                  <option value="4">4 Stars — High Quality Delivery</option>
                  <option value="3">3 Stars — Acceptable Quality</option>
                  <option value="2">2 Stars — Minor Bruising/Issues</option>
                  <option value="1">1 Star — Completely Unsatisfactory</option>
                </select>
              </div>
            </div>
            <div className="form-input-stack-cell mt-3">
              <label>Review Details</label>
              <textarea 
                rows={3} 
                placeholder="Comment on produce texturing, sizing, delivery timelines, and overall product crispness..." 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="review-textarea-field"
              />
            </div>
            <button type="submit" className="cta-button submit-fresh-review-btn mt-3">
              Publish Live Feedback
            </button>
          </form>
        </div>

        {/* FEED LOOP LIST BLOCKS */}
        <div className="customer-reviews-feed-list-stack">
          <h4 className="feed-header-heading">Recent Verifications ({totalReviews})</h4>
          
          {reviews.length > 0 ? (
            <div className="reviews-cards-container-loop">
              {reviews.map((rev) => (
                <div key={rev.id} className="customer-review-feed-card">
                  <div className="card-author-meta-strip">
                    <div className="author-badge-flex">
                      <span className="author-avatar-initial">{rev.author.charAt(0).toUpperCase()}</span>
                      <div>
                        <h5 className="author-name-text-bold">{rev.author}</h5>
                        <span className="review-timestamp-date">{rev.date}</span>
                      </div>
                    </div>
                    <div className="stars-row-flex">
                      {renderStars(rev.rating)}
                    </div>
                  </div>
                  <p className="customer-comment-body-paragraph">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-reviews-fallback-block">
              <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.25rem" }}>🌿</span>
              <p>No active reviews logged for this product catalog listings yet.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default ReviewSection;